import amqp from 'amqplib';

const rabbitMQConnection = 'amqp://localhost';
interface Data  {
    _id:string,
    createdBy:string
}

export const produceBooking = async (data:Data) => {
    try {
        const connection = await amqp.connect(rabbitMQConnection);
        const channel = await connection.createChannel();

        const queueName = 'bookingQueue';
        await channel.assertQueue(queueName, { durable: true });

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });

        console.log('Message sent to RabbitMQ:', data);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error sending message to RabbitMQ:', error);
    }
};
