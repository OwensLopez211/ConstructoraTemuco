const ContactMap = () => (
    <div className="rounded-xl overflow-hidden shadow mt-8 max-w-lg mx-auto">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.123456789!2d-72.612345!3d-38.735123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMzjCsDQ0JzA2LjQiUyA3MsKwMzYnNDQuOCJX!5e0!3m2!1ses-419!2scl!4v1680000000000"
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación Constructora Temuco"
      ></iframe>
    </div>
  );
  
  export default ContactMap;