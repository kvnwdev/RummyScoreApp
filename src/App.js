import { useState } from 'react';

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [scoreAdders, setScoreAdders] = useState([]);
  const [showWinners, setShowWinners] = useState(false);

  const addPlayer = (e) => {
    e.preventDefault();
    setPlayers((prevState) => [
      ...prevState,
      {
        name: newPlayerName,
        score: 0,
      },
    ]);
    setScoreAdders((prevState) => [...prevState, '']);
    setNewPlayerName('');
  };

  const onAddPlayerChange = (e) => setNewPlayerName(e.target.value);

  const addPointsToPlayer = (e, i) => {
    e.preventDefault();
    var tempPlayers = players.slice();
    var tempScoreAdders = scoreAdders.slice();
    tempPlayers[i].score =
      parseInt(tempPlayers[i].score) + parseInt(scoreAdders[i]);
    tempScoreAdders[i] = '';
    setPlayers(tempPlayers);
    setScoreAdders(tempScoreAdders);
  };

  const resetPlayerPoints = () => {
    var tempPlayers = players.slice();
    for (let x in tempPlayers) tempPlayers[x].score = 0;
    setPlayers(tempPlayers);
  };

  const onScoreAdderChange = (e, i) => {
    var tempScoreAdders = scoreAdders.slice();
    tempScoreAdders[i] = e.target.value;
    setScoreAdders(tempScoreAdders);
  };

  const onFindWinner = () => {
    var tempPlayers = players.slice();
    tempPlayers.sort((a, b) => a.score - b.score);
    setPlayers(tempPlayers);
  };

  return (
    <>
      <header className='header'>
        <div className='container mx-auto'>
          <h1 className='text-center text-xl font-bold mt-3'>Rummy App</h1>
        </div>
      </header>
      <section className='main'>
        <div className='container mx-auto'>
          <div className='w-5/6 mx-auto lg:w-full lg:grid lg:grid-cols-8 gap-3'>
            <div className='lg:col-span-2 sm:container-sm sm:p-4'>
              <h4 className='text-lg font-semibold text-center mb-4'>
                Game Actions
              </h4>
              <div className='card bg-neutral shadow-xl flex lg:w-full sm:w-3'>
                <div className='card-body'>
                  <h2 className='card-title'>Add Player</h2>
                  <form onSubmit={addPlayer}>
                    <div className='form-control w-full max-w-xs'>
                      <label className='label'>
                        <span className='label-text'>Player Name</span>
                      </label>
                      <input
                        type='text'
                        placeholder=''
                        value={newPlayerName}
                        onChange={onAddPlayerChange}
                        className='input input-bordered w-full max-w-xs'
                      />
                    </div>
                    <button
                      type='submit'
                      className='btn btn-success btn-outline mt-3'
                    >
                      Add Player
                    </button>
                  </form>
                </div>
              </div>
              <div className='card w-full bg-neutral shadow-xl flex mt-4'>
                <div className='card-body'>
                  <h2 className='card-title'>Reset Scores</h2>
                  <button
                    className='btn btn-success btn-outline mt-3'
                    onClick={resetPlayerPoints}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className='card w-full bg-neutral shadow-xl flex mt-4'>
                <div className='card-body'>
                  <h2 className='card-title'>Find Winner</h2>
                  <button
                    className='btn btn-success btn-outline mt-3'
                    onClick={() => {
                      onFindWinner();
                      setShowWinners((last) => !last);
                    }}
                  >
                    Find
                  </button>
                </div>
              </div>
            </div>
            <div className='lg:col-span-6 block'>
              <h4 className='text-lg font-semibold text-center mb-4'>
                Game Actions
              </h4>
              <div className='card w-full bg-neutral shadow-xl flex'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Score</th>
                      <th>Add Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => (
                      <tr key={index}>
                        <th>{player.name}</th>
                        <td>{player.score}</td>
                        <td>
                          <form onSubmit={(e) => addPointsToPlayer(e, index)}>
                            <div className='form-control w-full max-w-xs flex-row'>
                              <input
                                type='number'
                                placeholder=''
                                value={scoreAdders[index]}
                                onChange={(e) => onScoreAdderChange(e, index)}
                                className='input input-bordered w-full max-w-xs'
                              />
                              <button className='btn btn-primary ml-3 hidden lg:block'>
                                Add
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`modal ${showWinners ? 'modal-open' : ''}`}>
        <div className='modal-box relative'>
          <label
            className='btn btn-sm btn-circle absolute right-2 top-2'
            onClick={() => setShowWinners((last) => !last)}
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>
            Congrats, {players[0] ? players[0].name : 'winner'}!
          </h3>
          <p className='text-md font-semibold mt-3'>
            {players[0] ? players[0].name : 'winner'} is the winner!
          </p>
          <ul className='list-none mt-3'>
            {players.map((player, index) => (
              <li>
                <span className='font-bold'>{index + 1}. </span>
                {player.name} - {player.score} Points
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
