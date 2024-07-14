import * as amqp from 'amqplib';
import { saveData } from '../controller/eventController';


export async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'bookingQueue';
    await channel.assertQueue(queueName, { durable: true });

    await channel.consume(
      queueName,
      async (msg) => {
        if (msg !== null) {
          const data = JSON.parse(msg.content.toString());
          console.log('Received message:', data);

          await saveData(data);

          channel.ack(msg);
        }
      },
      { noAck: false } 
    );

    console.log('Waiting for messages...');
  } catch (error) {
    console.error('Error:', error);
  }
}


