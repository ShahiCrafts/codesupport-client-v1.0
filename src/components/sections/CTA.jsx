import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          Ready to Start?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Submit your project today and receive a quote within 24 hours. No commitment required.
        </p>
        <Link
          to="/submit-task"
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:scale-105 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] transition-all duration-300"
        >
          Submit Your Project
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
