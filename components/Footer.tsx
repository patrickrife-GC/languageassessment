export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-convey-dark text-white py-8 md:py-12 no-print">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Convey911</h3>
            <p className="text-gray-400 text-sm">
              Empowering emergency services with language access solutions that save lives.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.convey911.com/solutions" className="text-gray-400 hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="https://www.convey911.com/case-studies" className="text-gray-400 hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="https://www.convey911.com/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@convey911.com</li>
              <li>
                <a href="https://www.convey911.com/contact" className="hover:text-white transition-colors">
                  Request a Demo
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Convey911. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://www.convey911.com/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            {' | '}
            <a href="https://www.convey911.com/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
