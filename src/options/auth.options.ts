import z from "zod";

const postSession = {
  schema: {
    tags: ["Authentication"],
    description: "Authenticate a user with ldap authentication",
    body: z.object({
      username: z.string().min(3, { message: 'Nome de usuário deve conter pelo menos 3 caracteres' }).default('yuri'),
      password: z.string().min(6, { message: 'Senha deve conter pelo menos 8 caracteres' }).default('somePassword'),
    }),
    response: {
      200: z.object({
        token: z.string()
      }).describe("Authentication successfully"),
      '4xx': z.object({
        message: z.string()
      }),
      '5xx': z.object({
        error: z.string()
      })
    },
  }
}

export const authOptions = {
  postSession
}
