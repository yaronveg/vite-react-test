export const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
export const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
export const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
export const VALIDATOR_TYPE_MIN = "MIN";
export const VALIDATOR_TYPE_MAX = "MAX";
export const VALIDATOR_TYPE_EMAIL = "EMAIL";
export const VALIDATOR_TYPE_FILE = "FILE";

interface ValidatorConfigBase<A, B> {
  type: A;
  limiter: B;
}

type ValidatorConfigRequired = ValidatorConfigBase<"REQUIRE", undefined>;
type ValidatorConfigMinlength = ValidatorConfigBase<"MINLENGTH", number>;
type ValidatorConfigMaxlength = ValidatorConfigBase<"MAXLENGTH", number>;
type ValidatorConfigMin = ValidatorConfigBase<"MIN", number>;
type ValidatorConfigMax = ValidatorConfigBase<"MAX", number>;
type ValidatorConfigEmail = ValidatorConfigBase<"EMAIL", undefined>;
type ValidatorConfigFile = ValidatorConfigBase<"FILE", undefined>;

export type ValidatorConfig =
  | ValidatorConfigRequired
  | ValidatorConfigMinlength
  | ValidatorConfigMaxlength
  | ValidatorConfigMin
  | ValidatorConfigMax
  | ValidatorConfigFile
  | ValidatorConfigEmail;
