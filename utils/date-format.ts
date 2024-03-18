export function formatDateToRelativeTime(date: Date) {
  const now = new Date();

  const sameYear = date.getUTCFullYear() === now.getUTCFullYear();
  const sameMonth = date.getUTCMonth() === now.getUTCMonth();
  const sameDay = date.getUTCDate() === now.getUTCDate();
  const sameHour = date.getUTCHours() === now.getUTCHours();
  const sameMinute = date.getUTCMinutes() === now.getUTCMinutes();

  if (sameYear && sameMonth && sameDay && sameHour && sameMinute) {
    return 'agora';
  }

  if (sameYear && sameMonth && sameDay && sameHour) {
    const minutes = now.getUTCMinutes() - date.getUTCMinutes();
    return `${minutes} minuto${minutes === 1 ? '' : 's'} atrás`;
  }

  if (sameYear && sameMonth && sameDay) {
    const hours = now.getUTCHours() - date.getUTCHours();
    return `${hours} hora${hours === 1 ? '' : 's'} atrás`;
  }

  if (sameYear && sameMonth) {
    const thisWeek = now.getUTCDate() - date.getUTCDate() <= 7;

    if (thisWeek) return 'esta semana';

    const days = now.getUTCDate() - date.getUTCDate();

    return `${days} dia${days === 1 ? '' : 's'} atrás`;
  }

  if (sameYear) {
    const months = now.getUTCMonth() - date.getUTCMonth();

    if (months === 1) return 'mês passado';

    return `${months} mês${months === 1 ? '' : 'es'} atrás`;
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
