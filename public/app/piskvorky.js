const url = '/api/v1/games';
let uuid = '';
let board = Array.from({ length: 15 }, () => Array(15).fill(""));

const gameData = {
    name: 'Nová hra',
    difficulty: 'easy',
    board: board
};

async function createGame(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP Chyba ${response.status}: ${errorData.message}`);
        }

        const result = await response.json();
        console.log('Hra vytvořena:', result);

        uuid = result.uuid;
        return result;
    } catch (error) {
        console.error('Došlo k chybě při vytváření hry:', error);
    }
}

// createGame(url, gameData);





async function updateGame(url, uuid, updatedData) {
    try {
        const response = await fetch(`${url}/${uuid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP Chyba ${response.status}: ${errorData.message}`);
        }

        const result = await response.json();
        console.log('Hra upravena:', result);
        return result;
    } catch (error) {
        console.error('Došlo k chybě při aktualizaci hry:', error);
    }
}

// (async () => {
//     const createdGame = await createGame(url, gameData);

//     if (createdGame) {
//         const updatedGameData = {
//             ...gameData,
//             board: board
//         };

//         await updateGame(url, uuid, updatedGameData);
//     }
// })();