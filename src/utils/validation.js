export const checkValidity = (value, rules) => {
  let validity = true;

  if (!rules) {
    return true;
  }
  if (rules.notEpmty) {
    validity = validity.trim() !== '';
  }
  if (rules.required) {
    validity = value.trim() && validity;
  }
  if (rules.minLength) {
    validity = value.length >= rules.minLength && validity;
  }
  if (rules.minValue) {
    validity = value >= rules.minValue && validity;
  }
  if (rules.maxValue) {
    validity = value <= rules.maxValue && validity;
  }
  return validity;
}

export const canBeValue = (value, maxLength, minValue) => {

  const isSpecialSings = (val)=>{
    return (/[`%&!^#~<>;':"/[\]|{}()=_+-]/.test(val))
  }

  const canBeIntergerValue = (val) =>{
    if (IsInteger(Number(val)) >= minValue || val==="") {
      return true;
    }
    return false;
  }
  if(!isSpecialSings(value)){
    if (value.length <= maxLength) {
      if (minValue) {
        return canBeIntergerValue(value);
      }
      return true;
    }
  }
  return false;
}

export const canBeName = (value) => {
  const name = value
    .replace(/^\s+/, "")
    .replace(/\s+$/, "")
    .replace(/\s+/, " ")
  if (name == "") {
    return false;
  } else {
    return true;
  }
}

export const IsInteger = (value) => {
  return typeof value ==='number' && (value%1)==0;
}