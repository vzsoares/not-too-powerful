import type { APIGatewayProxyEvent } from 'aws-lambda';

declare module 'aws-lambda' {
  export interface APIGatewayProxyEventEnhanced extends APIGatewayProxyEvent {
    requestContext: {
      accountId: string;
      apiId: string;
      authorizer?: Record<string, unknown>;
      domainName: string;
      domainPrefix: string;
      http: {
        method: string;
        path: string;
        protocol: string;
        sourceIp: string;
        userAgent: string;
      };
      requestId: string;
      routeKey: string;
      stage: string;
      time: string;
      timeEpoch: number;
    };
  }
}
