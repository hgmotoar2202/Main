import { Controller, Get } from '@nestjs/common';
import { EXTRACTION_SCHEMA_VERSION } from '@insure/contracts';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'insure-api',
      extractionSchema: EXTRACTION_SCHEMA_VERSION,
    };
  }
}