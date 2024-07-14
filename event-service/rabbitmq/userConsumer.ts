import * as amqp from 'amqplib';
import UserData from '../model/userModel';

export const startConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const exchange = 'user.events';

    await channel.assertExchange(exchange, 'fanout', { durable: true });

    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, exchange, '');

    channel.consume(queue, async (msg: any) => {
      if (msg !== null) {
        const event = JSON.parse(msg.content.toString());
        console.log('Received event:', event);

        if (event.eventType === 'user.register') {
          const { userData } = event;

          try {
            const newUserProfile = new UserData({
              userId: userData._id, 
              email: userData.email,
            });

            await newUserProfile.save();
            console.log('User profile saved successfully');
          } catch (err) {
            console.error('Error saving user profile', err);
          }
        }
        channel.ack(msg);
      }
    });
    
    console.log('Waiting for messages...');
  } catch (error) {
    console.log('Error setting up consumer:', error);
  }
};
