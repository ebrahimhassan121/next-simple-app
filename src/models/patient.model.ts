import { IPatient } from '@/types/patient';
import mongoose from 'mongoose';
import { ModelNames } from './model-names';

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please provide a name.`],
  },
  phone: {
    type: String,
    required: [true, `Please provide a valid phone number.`],
    maxlength: [12, `phone number cannot be more than 12 characters`],
  },
  address: {
    type: String,
    default: ``,
  },
  age: {
    type: Number,
  },
  healthInfo: {
    type: String,
    default: ``,
  },
});
PatientSchema.set(`toJSON`, {
  virtuals: true,
  versionKey: false,
  transform(_, ret: any) {
    // eslint-disable-next-line
    ret.id = ret._id;
    // eslint-disable-next-line
    delete ret._id;
  },
});
const PatientModel =
  mongoose.models.Patient ||
  mongoose.model<IPatient & mongoose.Document>(
    ModelNames.patient,
    PatientSchema,
  );
export default PatientModel;
