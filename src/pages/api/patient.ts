import { connectToDatabase } from '@/../middlewares/mongodb';
import PatientModel from '@/models/patient.model';
import { IPatient } from '@/types/patient';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();
  switch (req.method) {
    case `GET`: {
      const patients = await PatientModel.find().sort({ name: 1 });
      return res.status(200).json({ patients });
    }
    case `POST`: {
      const patient: IPatient = req.body;
      const newPatient = new PatientModel(patient);
      const savedPatient = await newPatient.save();
      return res.status(201).json({ patient: savedPatient });
    }
    case `PUT`: {
      const { id, ...data } = req.body;
      const updatedPatient = await PatientModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return res.status(200).json({ updatedPatient });
    }
    case `DELETE`: {
      const { patientId } = req.body;
      await PatientModel.findByIdAndDelete(patientId);
      return res.status(200).json({ success: true });
    }
    default: {
      return res.status(405).json({ error: `Method not allowed` });
    }
  }
}
