import {
  ValidatorObject,
  VALIDATOR_TYPE_REQUIRE,
  VALIDATOR_TYPE_MINLENGTH,
  VALIDATOR_TYPE_MAXLENGTH,
  VALIDATOR_TYPE_MIN,
  VALIDATOR_TYPE_MAX,
  VALIDATOR_TYPE_EMAIL,
  VALIDATOR_TYPE_FILE,
  ValidatorConfig,
} from "./../interfaces/validation-types";

// TODO: create universal type for validators
export const VALIDATOR_REQUIRE = (limiter = undefined): ValidatorConfig => ({
  type: VALIDATOR_TYPE_REQUIRE,
  limiter,
});
export const VALIDATOR_MINLENGTH = (limiter: number): ValidatorConfig => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  limiter,
});
export const VALIDATOR_MAXLENGTH = (limiter: number): ValidatorConfig => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  limiter,
});
export const VALIDATOR_MIN = (limiter: number): ValidatorConfig => ({
  type: VALIDATOR_TYPE_MIN,
  limiter,
});
export const VALIDATOR_MAX = (limiter: number): ValidatorConfig => ({
  type: VALIDATOR_TYPE_MAX,
  limiter,
});
export const VALIDATOR_EMAIL = (limiter = undefined): ValidatorConfig => ({
  type: VALIDATOR_TYPE_EMAIL,
  limiter,
});
export const VALIDATOR_FILE = (limiter = undefined): ValidatorConfig => ({
  type: VALIDATOR_TYPE_FILE,
  limiter,
});

export const validation = (
  value: string | number,
  validators: ValidatorConfig[]
): boolean => {
  let isValid = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && (!!value || value === 0);
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid =
          isValid && (value as string).trim().length >= validator.limiter;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid =
          isValid && (value as string).trim().length <= validator.limiter;
        break;
      case VALIDATOR_TYPE_MIN:
        isValid = isValid && +value >= validator.limiter;
        break;
      case VALIDATOR_TYPE_MAX:
        isValid = isValid && +value <= validator.limiter;
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value as string);
        break;
      default:
        break;
    }
  }
  return isValid;
};
