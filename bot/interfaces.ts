export interface BotContext {
    reply: (text: string) => void;
    replyWithMarkdown: (...args: any[]) => any;
    message: {
        message_id: number;
        from: {
            id: number;
            is_bot: boolean;
            first_name: string;
            last_name: string;
            username: string;
            language_code: 'ru' | any;
        };
        chat: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            type: 'private' | any;
        };
        date: number;
        text: string;
        entities: [
            {
                offset: 0;
                length: 6;
                type: 'bot_command';
            }
        ];
    };
}
