export type ErrorKind =
  | "INVALID_PASSWORD"
  | "DUPLICATED_EMAIL"
  | "USER_NOT_FOUND"
  | "USER_IS_BLOCKED"
  | "PASSWORD_MISMATCH"
  | "INVALID_EMAIL"
  | "COURSE_NOT_FOUND"
  | "UNKNOWN_ERROR"
  | "SECTION_NOT_FOUND"
  | "INSCRIPTION_NOT_FOUND"
  | "UPLOAD_ERROR"
  | "RESOURCE_NOT_FOUND";

export interface BaseError {
  kind: ErrorKind;
  message: string;
  isOfKind: (otherKind: ErrorKind) => boolean;
}

export class ApiError implements BaseError {
  kind: ErrorKind;
  message: string;

  constructor(data: { kind: ErrorKind; message: string }) {
    this.kind = data.kind;
    this.message = data.message;
  }

  isOfKind(otherKind: ErrorKind) {
    return this.kind.toString() == otherKind.toString();
  }
}
