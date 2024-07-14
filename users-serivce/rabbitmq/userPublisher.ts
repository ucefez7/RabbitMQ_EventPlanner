import * as amqp from 'amqplib';

export const publishUser = async(eventType:string,userData:any)=>{
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const exchange = 'user.events';
        const message = JSON.stringify({
            eventType,
            userData,
        });
        await channel.assertExchange(exchange, 'fanout', { durable: true });
        channel.publish(exchange, '', Buffer.from(message));
        await channel.close();
        await connection.close();
    } catch (error) {
        console.log(error)
    }
}

