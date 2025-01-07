import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Op } from 'sequelize';
import { UserConnection } from '@libs/database/models/user-connection.model';

@Injectable()
export class CleanupService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    console.log('Cleaning up stale WebSocket connections...');

    const batchSize = 10000;
    while (true) {
      const updatedRows = await UserConnection.update(
        { ws_connection_string: null },
        {
          where: { ws_connection_string: { [Op.ne]: null } },
          limit: batchSize,
        },
      );

      if (updatedRows[0] === 0) break;
    }

    console.log('All stale WebSocket connections cleared.');
  }
}
