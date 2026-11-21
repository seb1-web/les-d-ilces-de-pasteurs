'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1450.2353023786059!2d2.3105797291936367!3d48.84254645257861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x47e670313cdb36b3%3A0x4e704cafa8821c8d!2s37%20Bd%20Pasteur%2C%2075015%20Paris!3m2!1d48.8427939!2d2.3131543999999997!5e0!3m2!1sfr!2sfr!4v1761175097792!5m2!1sfr!2sfr';

export default function ContactMap() {
  const [isMapVisible, setMapVisible] = useState(false);
  return (
    <div className="contact-map">
      {isMapVisible ? (
        <iframe title="Carte Google Maps : Les Délices de Pasteur, 37 boulevard Pasteur à Paris" src={mapEmbedUrl} width="600" height="620" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="contact-map-preview">
          <MapPin size={34} strokeWidth={1.25} aria-hidden="true" />
          <span className="contact-map-district">Paris 15e</span>
          <p>37 boulevard Pasteur</p>
          <button type="button" className="button button-secondary" onClick={() => setMapVisible(true)}>Afficher la carte Google</button>
          <small>La carte Google Maps se charge à votre demande.</small>
        </div>
      )}
    </div>
  );
}
