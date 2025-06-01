import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ResourceNotFound from "@/components/common/resource-not-found";

interface NotFoundProps {
  errorType?: string;
  errorMessage?: string;
}

export default function NotFound({ errorType, errorMessage }: NotFoundProps) {
  if (errorType === "resource") {
    return (
      <ResourceNotFound
        description={
          errorMessage || "The resource you requested could not be found."
        }
      />
    );
  }

  return (
    <div className="flex items-center justify-center px-4 mt-44">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl md:text-9xl font-bold text-blue-600">404</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
            Không tìm thấy trang
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/">Quay lại trang chủ</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
