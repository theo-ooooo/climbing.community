import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ statusCode: number; data: any; timestamp: string }> {
    return next.handle().pipe(
      map((data) => {
        const statusCode: HttpStatus = context
          .switchToHttp()
          .getResponse().statusCode;

        return {
          statusCode,
          data,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
