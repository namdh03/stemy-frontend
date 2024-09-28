import { z } from 'zod';

import { USER_MESSAGES } from '~utils/constants';
import { emailSchema, fullNameSchema, passwordSchema, phoneSchema } from '~utils/schema';

const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema(USER_MESSAGES.PASSWORD_MESSAGE),
});

export default registerSchema;
