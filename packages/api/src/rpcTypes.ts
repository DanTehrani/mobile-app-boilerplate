import { z } from 'zod';

/**
 * Request body for `registerExpoPushToken`
 */
export const registerExpoPushTokenRequestBodyType = z.object({
  token: z.string(),
});

export type RegisterExpoPushTokenRequestBody = z.infer<
  typeof registerExpoPushTokenRequestBodyType
>;

export const registerUserRequestBodyType = z.object({
  userId: z.string(),
});

export type RegisterUserRequestBody = z.infer<
  typeof registerUserRequestBodyType
>;

export const updateNotificationEnabledRequestBodyType = z.object({
  enabled: z.boolean(),
});

export type UpdateNotificationEnabledRequestBody = z.infer<
  typeof updateNotificationEnabledRequestBodyType
>;
