export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 16 }}>
              <div className="logo-mark">PC</div>
              <div className="logo-text">Pioneer Coaching</div>
            </div>
            <p>Bettiah&apos;s trusted coaching for Class 11 &amp; 12 Maths and Biology. Concept clarity, regular tests and personal attention.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="courses.html">Courses</a></li>
              <li><a href="faculty.html">Faculty</a></li>
              <li><a href="results.html">Results</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="notices.html">Notices</a></li>
              <li><a href="timetable.html">Time Table</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="brochure.html">Brochure</a></li>
            </ul>
          </div>
          <div>
            <h4>Courses</h4>
            <ul>
              <li><a href="course-maths.html">Class 11 Maths</a></li>
              <li><a href="course-biology.html">Class 11 Biology</a></li>
              <li><a href="course-maths.html">Class 12 Maths</a></li>
              <li><a href="course-biology.html">Class 12 Biology</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <ul className="f-contact">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>Sagar Pokhara Road, Kamalnath Nagar, Paroraha, Bettiah, Bihar 845438</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                <a href="tel:+916202149922">062021 49922</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© <span id="year">2026</span> Pioneer Coaching, Bettiah. All rights reserved.</div>
      </div>
    </footer>
  );
}
