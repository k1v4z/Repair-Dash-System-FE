import { motion } from "framer-motion";

// import { Button } from "@/components/ui/button";
// import Icon from "@/components/icons";
import { PLANS } from "@/features/subscriptions/constants/pricing-plan";
import SubscriptionItem from "./_components/subscription-item";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const SubscriptionPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Gói Dịch Vụ</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Chọn gói phù hợp với nhu cầu của bạn và nâng cao hiệu quả kinh doanh
        </p>
      </motion.div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {PLANS.map((plan) => (
          <SubscriptionItem key={plan.id} plan={plan} />
        ))}
      </motion.div>
      {/* <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="mt-8 text-center py-8 px-6 bg-muted/50 rounded-2xl max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Còn câu hỏi?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Liên hệ với đội ngũ hỗ trợ của chúng tôi để được giải đáp mọi thắc mắc
          về các gói dịch vụ
        </p>
        <Button variant="outline" size="lg" className="group">
          <Icon glyph="message" className="mr-2 group-hover:animate-bounce" />
          Liên Hệ Hỗ Trợ
        </Button>
      </motion.div> */}
    </div>
  );
};

export default SubscriptionPage;
