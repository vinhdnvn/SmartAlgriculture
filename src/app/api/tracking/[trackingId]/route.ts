import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
// import tracking from '@/app/components/ui/tracking';

interface IParams {
  trackingId?: string;
}

export async function POST( { params }: { params: IParams }) {
  try {
   
    const { trackingId } = params

    const updatedUser = await prisma.tracking.update({
      where: {
        id: trackingId
      },
      data: {
        haveDiseasePlant: true,
      },
    });

    if (!updatedUser) {
      console.log('Tracking not found');
      return new NextResponse('Tracking not found', { status: 404 });
    }
    return new NextResponse('updated success', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('updated Tracking error API', { status: 500 });
  }
}

// export default function handler(req: NextApiRequest, res: NextApiResponse, trackingId: string) {
//   switch (req.method) {
//     case 'PATCH':
//       return POST(req, res, trackingId);
//     default:
//       return new NextResponse('Method not allowed', { status: 405 });
//   }
// }
