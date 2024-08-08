import { HistoryDto } from '@app/shared/models';
import { BaseResultPagination } from '@app/shared/types';
import { PaginationDto } from '@app/shared/types/pagination.dto';
import { Controller, HttpCode, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import { QueryHistoriesDto } from './dtos/queryActivity.dto';
import { HistoryService } from './activity.service';

@ApiTags('Activity')
@ApiExtraModels(BaseResultPagination, PaginationDto, HistoryDto)
@Controller('activities')
export class ActivityController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Activities By Query params',
    description: 'Use this API to get the history of NFTs.',
  })
  @HttpCode(200)
  @ApiOkResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(BaseResultPagination),
        },
        {
          properties: {
            data: {
              properties: {
                items: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(HistoryDto),
                  },
                },
              },
            },
          },
        },
      ],
    },
  })
  async getHistories(@Query() params: QueryHistoriesDto) {
    return await this.historyService.getHistories(params);
  }
}
