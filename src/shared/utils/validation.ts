const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

// TODO: create universal type for validators
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number) => ({
  type: VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: number) => ({
  type: VALIDATOR_TYPE_MAX,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });

interface ValidatorConfigBase<A, B> {
  type: A;
  value: B;
}
type ValidatorConfigRequired = ValidatorConfigBase<"REQUIRE", undefined>;
type ValidatorConfigMinlength = ValidatorConfigBase<"MINLENGTH", number>;
type ValidatorConfigMaxlength = ValidatorConfigBase<"MAXLENGTH", number>;
type ValidatorConfigMin = ValidatorConfigBase<"MIN", number>;
type ValidatorConfigMax = ValidatorConfigBase<"MAX", number>;
type ValidatorConfigEmail = ValidatorConfigBase<"EMAIL", number>;

export type ValidatorConfig =
  | ValidatorConfigRequired
  | ValidatorConfigMinlength
  | ValidatorConfigMaxlength
  | ValidatorConfigMin
  | ValidatorConfigMax
  | ValidatorConfigEmail;

export const validation = (
  value: string | number,
  validators: ValidatorConfig[]
) => {
  let isValid = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && (!!value || value === 0);
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && (value as string).trim().length >= validator.value;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && (value as string).trim().length <= validator.value;
        break;
      case VALIDATOR_TYPE_MIN:
        isValid = isValid && +value >= validator.value;
        break;
      case VALIDATOR_TYPE_MAX:
        isValid = isValid && +value <= validator.value;
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
