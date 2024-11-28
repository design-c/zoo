import { Module } from '@nestjs/common';
import { ZooNewsService } from './zoo-news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ZooNewsItem, ZooNewsItemSchema } from './zoo-news.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ZooNewsItem.name, schema: ZooNewsItemSchema }])
    ],
    providers: [
        ZooNewsService
    ],
    exports: [
        ZooNewsService
    ]
})
export class SharedZooNewsModule {
}
