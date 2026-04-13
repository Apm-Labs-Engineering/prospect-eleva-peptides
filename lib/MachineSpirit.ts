import { v4 as uuidv4 } from "uuid";
import * as Sentry from "@sentry/nextjs";

export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export class MachineSpirit {
  private static lastLoggedError: any = null;

  constructor(private logOrigin?: string) {}

  private logFormat(
    level: LogLevel,
    message: string,
    transactionId: string = uuidv4(),
    properties?: any,
  ): { formattedLog: string; transactionId: string } {
    const timestamp = new Date().toISOString();
    const fileContext = this.logOrigin ? `[${this.logOrigin}]` : "";
    let formattedLog = `${timestamp} [${transactionId}] ${level} ${fileContext}: ${message}`;

    if (properties) {
      formattedLog += `\n${JSON.stringify(properties)}`;
    }

    return { formattedLog, transactionId };
  }

  info(
    message: string,
    {
      transactionId,
      properties,
    }: {
      transactionId?: string;
      properties?: any;
    },
  ): void {
    const { formattedLog } = this.logFormat(
      LogLevel.INFO,
      message,
      transactionId,
      properties,
    );
    console.info(formattedLog);
    Sentry.logger.info(formattedLog, { log_source: this.logOrigin });
  }

  warn(
    message: string,
    {
      transactionId,
      properties,
    }: {
      transactionId?: string;
      properties?: any;
    },
  ): void {
    const { formattedLog } = this.logFormat(
      LogLevel.WARN,
      message,
      transactionId,
      properties,
    );
    console.warn(formattedLog);
    Sentry.logger.warn(formattedLog, { log_source: this.logOrigin });
  }

  error(
    message: string,
    {
      error,
      transactionId,
      properties,
    }: {
      error?: any;
      transactionId?: string;
      properties?: any;
    },
  ): void {
    const { formattedLog } = this.logFormat(
      LogLevel.ERROR,
      message,
      transactionId,
      properties,
    );

    MachineSpirit.lastLoggedError = error ?? message;

    let localFormat = formattedLog;
    let errObj: Error | undefined;

    if (error instanceof Error) {
      localFormat += `\n${error.stack || error.message}`;
      errObj = error;
    } else if (error) {
      localFormat += `\n${JSON.stringify(error)}`;
    }

    console.error(localFormat);
    Sentry.logger.error(formattedLog, { log_source: this.logOrigin });
  }

  success(
    message: string,
    {
      transactionId,
      properties,
    }: {
      transactionId?: string;
      properties?: any;
    },
  ): void {
    const { formattedLog } = this.logFormat(
      LogLevel.SUCCESS,
      message,
      transactionId,
      properties,
    );
    console.log(formattedLog);
    Sentry.logger.info(formattedLog, {
      log_source: this.logOrigin,
      type: "Success",
    });
  }

  public static getLastError(): any {
    return MachineSpirit.lastLoggedError;
  }

  public static extractLastErrorMessage(): string | null {
    return this.extractMessageFrom(MachineSpirit.lastLoggedError);
  }

  public static extractMessageFrom(error: any): string | null {
    if (!error) return null;

    const detail = error?.response?.data?.detail;

    if (detail?.dynamics_error?.error?.message) {
      return `Dynamics Error: ${detail.dynamics_error.error.message}`;
    }

    if (typeof detail === "string") {
      return detail;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return null;
  }
}
