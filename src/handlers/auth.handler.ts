import { LdapAuthenticationError, authenticate } from "ldap-authentication";
import { THandler, TPostSession } from "../types";

async function postSession({ password, username, reply }: THandler<TPostSession>) {
  try {
    const authenticated = await authenticate({
      ldapOpts: {
        url: 'ldap://10.10.50.1'
      },
      userDn: `uid=${username},ou=usuarios,dc=cotripal,dc=com,dc=br`,
      userPassword: password,
      userSearchBase: 'ou=usuarios,dc=cotripal,dc=com,dc=br',
      usernameAttribute: 'uid',
      username,
      attributes: ['dn', 'sn', 'cn']
    })
    console.log(authenticated)
    reply.status(200).send({ token: 'your_token_here' })
  } catch (error) {
    const err = error as LdapAuthenticationError
    console.error(err.name)
    if (err.name === 'InvalidCredentialsError') {
      reply.status(401).send({ message: 'Invalid credentials' })
    }
    reply.status(500).send({ error: 'something went wrong' })
  }
}

export const authHandlers = {
  postSession
}
