import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
// import tracking from '@/app/components/ui/tracking';

const ids = [
  '6547a400f47517c991e3784e',
  '6547ab0c2c27d8fd0cdb1cb5',
  '6547c52ba360013598a0f305', 
  '6547c571a360013598a0f306'
];

// constant number start from 0 



export async function POST() {
  let idIndex = 0; 
  try {
   


    const updatedUser = await prisma.tracking.update({
      where: {
        id : ids[idIndex]
      },
      data: {
        haveDiseasePlant: true
      },
    });

    if (!updatedUser) {
      console.log('Tracking not found');
      return new NextResponse('Tracking not found', { status: 404 });
    }
   else {
    // increase constant id 
    idIndex++;
    return new NextResponse('updated success', { status: 200 });
  } 
    
  } catch (error) {
    console.log(error);
    return new NextResponse('updated Tracking error API', { status: 500 });
  }
}


