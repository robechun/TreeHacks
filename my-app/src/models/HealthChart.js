import { Model } from 'radiks';

export default class HealthChart extends Model {
  static className = 'HealthChart';

  static schema = {
    userGroupId: String, 
    name: String,
    age: Number,
    date: Date,
    symptoms: String,
    dianosis: String,
    treatment: String
  }
}