export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 no-print">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-convey-blue">Convey911</div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a
              href="https://www.convey911.com"
              className="text-gray-600 hover:text-convey-blue transition-colors"
            >
              Home
            </a>
            <a
              href="https://www.convey911.com/solutions"
              className="text-gray-600 hover:text-convey-blue transition-colors"
            >
              Solutions
            </a>
            <a
              href="https://www.convey911.com/contact"
              className="bg-convey-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
