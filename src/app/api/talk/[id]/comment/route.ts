import prisma from "@/prisma";
// import { PageProps } from "@/types/pages-props";
import { NextResponse } from "next/server";

// export async function GET(_request: Request, { params }: PageProps) {
//   const { id } = await params;

//   try {
//     const talkComments = await prisma.talkComment.findMany({
//       where: { talkId: id, replyToId: null },

//       include: {
//         author: true,
//         replies: {
//           include: {
//             author: true,
//             replyToUser: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(talkComments, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Erreur interne du serveur: " + error },

//       { status: 500 }
//     );
//   }
// }

export async function PATCH(request: Request) {
  try {
    const { talkId, content, authorId, replyToId, replyToUserId } =
      await request.json();

    const reply = await prisma.talkComment.create({
      data: {
        content,
        authorId,
        talkId,
        replyToId,
        replyToUserId,
      },
    });

    return NextResponse.json(
      { message: "Réponse au commentaire créée", comment: reply },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur interne du serveur: " + error },
      { status: 500 }
    );
  }
}
