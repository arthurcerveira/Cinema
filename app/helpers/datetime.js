//EU ODEIO DATAS DO FUNDO DO MEU CORAÇÃO

module.exports = {
    getHoje: () => {
        const hoje = new Date();

        const hojeNovo = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), hoje.getHours() - 3, 59, 58);
        const hojeFormatado = hojeNovo.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-');

        return hojeFormatado;

    },
    getNextWeek: () => {
        const hoje = new Date();

        const nextWeek = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 7, 20, 59, 58);
        const nextWeekFormatado = nextWeek.toISOString().slice(0, 19).replace('T', ' ').replaceAll('/', '-');

        return nextWeekFormatado;
    }
}
