
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// It should be at Common module not Auth module
export const RawHeaders = createParamDecorator(
    ( data: string, ctx: ExecutionContext ) => {

        // With data can return specific header

        const headers = ctx.switchToHttp().getRequest();
        const { rawHeaders } = headers;
        return rawHeaders;

    }
)
