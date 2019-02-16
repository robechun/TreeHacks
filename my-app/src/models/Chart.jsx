import { Model } from 'radiks';

class Chart extends Model {
  static className = 'Chart';

  static schema = {
    name: String,
    age: Number,
    date: Date,
    chart: String
  }
  
  userGroupId;

}