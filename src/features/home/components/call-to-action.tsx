import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative py-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-blue-600/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-8">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners who trust our network of
            professional service providers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
