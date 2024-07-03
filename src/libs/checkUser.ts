import db from '@/db/db';
import { currentUser } from '@clerk/nextjs/server';

export default async function checkUser() {
  try {
    const user = await currentUser();
    if (!user) return null;
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id
      }
    });

    if (loggedInUser) return loggedInUser;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl
      }
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
