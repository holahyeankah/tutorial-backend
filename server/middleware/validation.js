
 
const Validator= require ("validatorjs") ;


class UserInputValidation {
  
   
  static signUpInputValidation(req, res, next) {
    const {
      
      fullname,
      email,
      password,
      password_confirmation 
    } = req.body;
    const data = {
      fullname,
      email,
      password,
      password_confirmation 
    };
    const rules = {
      fullname: 'required|string|min:5|max:40',
      email: 'required|string|email',
      password: 'required|min:8|max:40|confirmed',
      password_confirmation: 'required'
    };
    const message = {
      'string.fullname': 'This :attribute has to be a string value.',
      'min.fullname':
          'This :attribute is too short. Min length is :min characters.',
      'max.fullname':
          'This :attribute is too long. Max length is :max characters.',
      'regex.fullname':
          'The :attribute you have entered contains invalid character(s).',
      'required.fullname': 'Please you have to specify a valid :attribute',
      'required.email':
          'Please you have to specify a valid :attribute so we can contact you.',
      'string.email': 'Sorry, the :attribute has to be a string value.',
      'email.email': 'Please enter a valid :attribute address.',
      'required.password': ':attribute field is required.',
      'min.password':
          'The :attribute is too short. Min length is :min characters.',
      'max.password':
          'The :attribute is too long. Max length is :max characters.',
      'confirmed.password': 'Password Mismatch.'
       
    };
    const validation = new Validator(data, rules, message);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }

 
  static loginInputValidation(req, res, next) {
    const { email, password } = req.body;
    const data = {
      email,
      password
    };
    const rules = {
      email: 'required',
      password: 'required'
    };
    const message = {
      'required.email': 'This :attribute is a required field.',
      'required.password': 'This :attribute is a required field.'
    };
    const validation = new Validator(data, rules, message);
    if (validation.passes()) {
      return next();
    }
    return res.status(400).json({
      errors: validation.errors.all()
    });
  }
}

module.exports={UserInputValidation}

