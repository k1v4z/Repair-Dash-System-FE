import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Icon from "@/components/icons";
import type { PricingPlan } from "@/features/subscriptions/types/plan-pricing.type";
import { useZaloPayCheckout } from "@/features/subscriptions/hooks/useZaloPayCheckout";
import { toast } from "react-toastify";
import { useUser } from "@/features/user/hooks/useUser";
import { SubscriptionPlan } from "@/features/user/types/user.types";

interface SubscriptionItemProps {
  plan: PricingPlan;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const getCurrentPlan = (priority: number, planType: string) => {
  if (planType === "free" && priority === SubscriptionPlan.FREE) {
    return "Gói hiện tại";
  }
  if (planType === "monthly" && priority === SubscriptionPlan.MONTHLY) {
    return "Gói hiện tại";
  }
  if (planType === "yearly" && priority === SubscriptionPlan.YEARLY) {
    return "Gói hiện tại";
  }
  return null;
};

const alreadyHavePlan = (priority: number) => {
  if (
    priority === SubscriptionPlan.MONTHLY ||
    priority === SubscriptionPlan.YEARLY
  ) {
    return true;
  }
  return false;
};

const SubscriptionItem = ({ plan }: SubscriptionItemProps) => {
  const { isLoading, error, initiatePayment } = useZaloPayCheckout();
  const { user } = useUser();

  const handleSubscribe = async () => {
    if (plan.type === "FREE") {
      return;
    }

    try {
      await initiatePayment(plan.type);
    } catch (error) {
      alert("Không thể kết nối tới cổng thanh toán");
      console.error("Failed to create payment:", error);
    }
  };

  if (error) {
    toast.error("Không thể kết nối tới cổng thanh toán");
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className={`h-full flex flex-col relative overflow-hidden ${
          plan.popular
            ? "border-primary border-2 shadow-lg shadow-primary/20"
            : ""
        }`}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0 left-0 bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
            Phổ biến nhất
          </div>
        )}
        {plan.badge && (
          <div className="absolute top-4 right-4 rotate-12">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-green-200 font-bold"
            >
              {plan.badge}
            </Badge>
          </div>
        )}
        <CardHeader className={`${plan.popular ? "pt-8" : ""}`}>
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <CardDescription className="mt-2">{plan.description}</CardDescription>
          {plan.price && (
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.id !== "free" && (
                <span className="text-muted-foreground ml-1 text-sm">
                  {plan.id === "yearly" ? "/năm" : "/tháng"}
                </span>
              )}
            </div>
          )}
          {plan.annualDiscount && (
            <span className="text-sm text-green-600 font-medium mt-1 block">
              {plan.annualDiscount}
            </span>
          )}
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-4">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div
                  className={`flex-shrink-0 h-5 w-5 mr-2 ${
                    feature.included ? "text-green-500" : "text-gray-400"
                  }`}
                >
                  <Icon glyph={feature.included ? "check" : "x"} />
                </div>
                <span
                  className={feature.included ? "" : "text-muted-foreground"}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full transition-all duration-300"
            variant={plan.id === "free" ? "outline" : "default"}
            size="lg"
            onClick={handleSubscribe}
            isLoading={isLoading}
            loadingText="Đang xử lý..."
            disabled={
              plan.id === "free" ||
              alreadyHavePlan(user?.user_priority as SubscriptionPlan)
            }
          >
            {getCurrentPlan(user?.user_priority as SubscriptionPlan, plan.id) ||
              plan.buttonText}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SubscriptionItem;
