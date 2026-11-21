import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { path: '/', name: 'accueil' },
  { path: '/menu', name: 'carte' },
  { path: '/contact', name: 'contact' },
  { path: '/blog', name: 'journal' },
] as const;

async function openRoute(page: Page, path: string) {
  const response = await page.goto(path);
  expect(response?.status(), `${path} doit répondre HTTP 200`).toBe(200);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

test.describe('Routes, mise en page et images locales', () => {
  for (const width of [320, 390, 768, 1440]) {
    for (const route of routes) {
      test(`${route.name} à ${width}px : route, débordement et capture`, async ({ page }, testInfo) => {
        await page.setViewportSize({ width, height: width === 1440 ? 1000 : 900 });
        const errors: string[] = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await openRoute(page, route.path);
        await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
        await expect.poll(() => page.evaluate(() => ({
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          viewport: window.innerWidth,
        }))).toEqual({ document: width, body: width, viewport: width });

        if (width === 1440) {
          const images = await page.locator('img').evaluateAll((nodes) => [...new Set(nodes
            .map((node) => (node as HTMLImageElement).currentSrc || (node as HTMLImageElement).src)
            .filter((src) => src.startsWith(location.origin)))]);
          expect(images.length, 'Chaque route doit afficher ses vraies images locales').toBeGreaterThan(0);
          const decoded = await page.evaluate(async (sources) => Promise.all(sources.map(async (src) => {
            const image = new Image();
            image.src = src;
            try {
              await image.decode();
              return { src, valid: image.naturalWidth > 0 && image.naturalHeight > 0 };
            } catch {
              return { src, valid: false };
            }
          })), images);
          expect(decoded.filter((image) => !image.valid), 'Toutes les images locales doivent se décoder').toEqual([]);
        }

        expect(errors, 'Aucune exception JavaScript de la page').toEqual([]);
        await page.screenshot({ path: testInfo.outputPath(`${route.name}-${width}.png`), fullPage: false });
      });
    }
  }
});

test('Carte : 115 produits, filtres, recherche sans accents, état vide et réinitialisation', async ({ page }) => {
  await openRoute(page, '/menu');
  const items = page.locator('.menu-item');
  const results = page.locator('.menu-result-line [role="status"]');
  await expect(items).toHaveCount(115);
  await expect(results).toContainText('115');
  await page.getByRole('button', { name: 'Pains', exact: true }).click();
  await expect(page).toHaveURL(/\/menu\?category=bread$/);
  await expect(items).toHaveCount(25);
  await expect(page.getByRole('button', { name: 'Pains', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Prix en boutique', { exact: true })).toBeVisible();
  await page.getByLabel('Rechercher dans la carte').fill('epeautre');
  await expect(items).toHaveCount(1);
  await expect(items.first()).toContainText('Petit épeautre');
  await page.getByLabel('Rechercher dans la carte').fill('zzzz-introuvable');
  await expect(items).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Aucune création trouvée' })).toBeVisible();
  await page.getByRole('button', { name: 'Réinitialiser la recherche' }).click();
  await expect(items).toHaveCount(115);
  await expect(page.getByLabel('Rechercher dans la carte')).toHaveValue('');
  await expect(page.getByLabel('Rechercher dans la carte')).toBeFocused();
  await expect(page).toHaveURL(/\/menu$/);
});

test('Carte : liens de catégories de l’accueil et historique navigateur', async ({ page }) => {
  await openRoute(page, '/');
  const categoryLinks = page.locator('.creation-card');
  await expect(categoryLinks).toHaveCount(4);
  for (const category of ['bread', 'viennoiseries', 'pastry', 'sandwiches']) {
    await expect(page.locator(`.creation-card[href="/menu?category=${category}"]`)).toHaveCount(1);
  }
  await page.locator('.creation-card[href="/menu?category=bread"]').click();
  await expect(page.locator('.menu-item')).toHaveCount(25);
  await page.getByRole('button', { name: 'Pâtisseries', exact: true }).click();
  await expect(page.locator('.menu-item')).toHaveCount(40);
  await page.goBack();
  await expect(page).toHaveURL(/category=bread$/);
  await expect(page.locator('.menu-item')).toHaveCount(25);
  await page.goForward();
  await expect(page).toHaveURL(/category=pastry$/);
  await expect(page.locator('.menu-item')).toHaveCount(40);
  await page.goto('/menu?category=inconnue');
  await expect(page.locator('.menu-item')).toHaveCount(115);
  await expect(page.getByRole('button', { name: 'Toute la carte', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('Noël : précédent, suivant, vignettes, lecture et pause', async ({ page }) => {
  await openRoute(page, '/');
  const gallery = page.getByRole('region', { name: 'Photos de Noël' });
  const selected = () => gallery.locator('.gallery-thumbnails button[aria-pressed="true"]');
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 1');
  await gallery.getByRole('button', { name: 'Photo de Noël suivante' }).click();
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 2');
  await gallery.getByRole('button', { name: 'Photo de Noël précédente' }).click();
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 1');
  await gallery.getByRole('button', { name: 'Photo de Noël précédente' }).click();
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 4');
  await gallery.getByRole('button', { name: 'Afficher la photo de Noël 1', exact: true }).click();
  await expect(gallery.locator('.christmas-photo img:visible')).toHaveCount(1);
  await gallery.getByRole('button', { name: 'Lancer le diaporama' }).click();
  await expect(gallery.getByRole('button', { name: 'Mettre le diaporama en pause' })).toBeVisible();
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 2', { timeout: 6500 });
  await gallery.getByRole('button', { name: 'Mettre le diaporama en pause' }).click();
  await expect(gallery.getByRole('button', { name: 'Lancer le diaporama' })).toBeVisible();
  await page.waitForTimeout(4700);
  await expect(selected()).toHaveAttribute('aria-label', 'Afficher la photo de Noël 2');
});

test('Noël : mouvement réduit conserve la navigation manuelle', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openRoute(page, '/');
  const gallery = page.getByRole('region', { name: 'Photos de Noël' });
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery.getByRole('button', { name: 'Lancer le diaporama' })).toHaveCount(0);
  await gallery.getByRole('button', { name: 'Photo de Noël suivante' }).click();
  await expect(gallery.getByRole('button', { name: 'Afficher la photo de Noël 2', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(gallery.locator('.christmas-photo img:visible')).toHaveCount(1);
});

test('Navigation mobile : clavier, Échap, focus et changement de page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openRoute(page, '/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  const trigger = page.locator('.menu-toggle');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const navigation = page.getByRole('navigation', { name: 'Navigation mobile' });
  await expect(navigation.getByRole('link').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  await expect(page.locator('#mobile-navigation')).toBeHidden();
  await page.keyboard.press('Enter');
  await page.locator('#mobile-navigation .button').focus();
  await page.keyboard.press('Tab');
  await expect(trigger).toBeFocused();
  await navigation.getByRole('link', { name: /La carte/ }).click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#mobile-navigation')).toBeHidden();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await expect(page.locator('.menu-item')).toHaveCount(115);
});

test('Journal : filtres, recherche sans accents, vide et remise à zéro', async ({ page }) => {
  await openRoute(page, '/blog');
  const photos = page.locator('.journal-photo');
  await expect(photos).toHaveCount(5);
  await page.getByRole('group', { name: 'Filtrer les photos par thème' }).getByRole('button', { name: 'Noël' }).click();
  await expect(photos).toHaveCount(3);
  await page.getByLabel('Rechercher une photo').fill('patisseries');
  await expect(photos).toHaveCount(1);
  await expect(photos.first()).toHaveAttribute('target', '_blank');
  await expect(photos.first()).toHaveAttribute('href', '/Images/optimized/Noel1.webp');
  await page.getByLabel('Rechercher une photo').fill('zzzz-introuvable');
  await expect(photos).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Aucune photo trouvée' })).toBeVisible();
  await page.getByRole('button', { name: 'Réinitialiser les filtres' }).click();
  await expect(photos).toHaveCount(5);
  await expect(page.getByLabel('Rechercher une photo')).toHaveValue('');
  await expect(page.locator('.journal-results-count')).toHaveText('5 photos');
});

test('Contact : carte chargée uniquement sur demande et liens pratiques', async ({ page }) => {
  // On teste l’intégration locale : la disponibilité du service Google n’est pas validée ici.
  await page.route('https://www.google.com/maps/embed?**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><html lang="fr"><title>Carte de test</title><body>Carte de test</body></html>' }));
  await openRoute(page, '/contact');
  await expect(page.locator('.contact-map iframe')).toHaveCount(0);
  await expect(page.locator('main a[href="tel:+33143063753"]').first()).toBeVisible();
  await page.getByRole('button', { name: 'Afficher la carte Google' }).click();
  const map = page.locator('.contact-map iframe');
  await expect(map).toBeVisible();
  await expect(map).toHaveAttribute('src', /^https:\/\/www\.google\.com\/maps\/embed\?/);
  await expect(map).toHaveAttribute('title', /37 boulevard Pasteur/);
  await expect(page.getByRole('button', { name: 'Afficher la carte Google' })).toHaveCount(0);
});

test.describe('Accessibilité WCAG A et AA', () => {
  for (const route of routes) {
    test(`${route.name} : axe WCAG 2 et 2.1`, async ({ page }, testInfo) => {
      await openRoute(page, route.path);
      const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      await testInfo.attach(`axe-${route.name}.json`, { body: JSON.stringify(report, null, 2), contentType: 'application/json' });
      const violations = report.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        helpUrl: violation.helpUrl,
        nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
      }));
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });
  }
});
