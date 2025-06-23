const queryKeys = {
  asyncStorageValue: (key: string) => ['asyncStorage', key] as const,
  secureStorageValue: (key: string) => ['secureStorage', key] as const,

  userId: ['userId'] as const,
  notificationPermission: ['notificationPermission'] as const,
};

export default queryKeys;
