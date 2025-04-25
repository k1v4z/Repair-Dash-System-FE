export type ZaloPayResponse = {
  return_code: number;
  return_message: string;
  sub_return_code: number;
  sub_return_message: string;
  zp_trans_token: string;
  order_url: string;
  cashier_order_url: string;
  order_token: string;
  qr_code: string;
  app_trans_id: string;
};

export type ZaloPayVerifyResponse = {
  code: number;
  return_code: number;
  return_message: string;
};
