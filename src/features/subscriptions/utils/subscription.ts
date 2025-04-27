export function getSubscriptionPlanName(priority: number): string {
  switch (priority) {
    case 0:
      return "Miễn phí";
    case 1:
      return "Gói tháng";
    case 2:
      return "Gói năm";
    default:
      return "Không xác định";
  }
}

export function calculateRemainingDays(
  createdAt: string,
  priority: number
): number {
  if (!createdAt || priority === 0) return 0;

  const startDate = new Date(createdAt);
  const currentDate = new Date();

  // Calculate end date based on subscription type
  const endDate = new Date(startDate);
  if (priority === 1) {
    // Monthly plan - add 30 days
    endDate.setDate(startDate.getDate() + 30);
  } else if (priority === 2) {
    // Yearly plan - add 365 days
    endDate.setDate(startDate.getDate() + 365);
  }

  // If subscription has expired, return 0
  if (currentDate > endDate) return 0;

  // Calculate remaining days
  const remainingTime = endDate.getTime() - currentDate.getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));

  return remainingDays;
}
