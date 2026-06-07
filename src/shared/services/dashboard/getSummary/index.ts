import { prisma } from '../../../../database/prisma/prisma';
import { AppError } from '../../../../errors/AppError';



export const getSummary = async (userId: string) => {
  // Procura o user e lança erro se não existir
  const user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      clients: true,
      appointments: true
    }
  });

  if (!user) throw new AppError('Id inválido', 400);

  // Constante para comparar datas com o dia atual
  const today = new Date();

  // Array com agendamentos do mesmo dia  
  const appointmentsToday = user.appointments.filter((value) => {
    return new Date(value.date).toDateString() === today.toDateString();
  });

  const appointmentsMonth = user.appointments.filter((value) => {
    const valueDate = new Date(value.date);

    const sameMonth = valueDate.getMonth() === today.getMonth();
    const sameYear = valueDate.getFullYear() === today.getFullYear();

    return sameMonth && sameYear;
  });

  // Retorna o summary do user 
  return {
    totalClients: user.clients.length,
    totalAppointments: user.appointments.length,
    appointmentsToday: appointmentsToday.length,
    appointmentsThisMonth: appointmentsMonth.length
  };
  // return {
  //   'totalClients': 12,
  //   'totalAppointments': 31,
  //   'appointmentsToday': 4,
  //   'appointmentsThisMonth': 18
  // }
}; 
