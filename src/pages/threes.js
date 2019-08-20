import React from 'react'

import DefaultLayout from '../layouts/defaultLayout';

const SecondPage = () => (
  <DefaultLayout>
    {/* I used a markdown to html converter for this. may be wonky */}

    <section id="threes">
      <h1 class="threes-heading official-rules-of-threes">Official Rules of Threes</h1>
      <ul>
        <li>A &quot;serving&quot; is half of a light beer</li>
        <li>Pour a serving of beer into a cup before the round starts. If forgotten, you can pour the drink after a round is over, however the loser <strong>cannot</strong> pour their own drink</li>
        <li>The loser of the previous round goes first. If there were multiple losers, whoever finished their drink fastest gets &quot;advantage&quot; and goes first</li>
        <li>There should be one three per person playing the game. Remove if less than four players, add if more (can use jokers)</li>
        <li>When possible, things must be done in threes</li>
        <li>Feel free to apply house rules as you see fit</li>
        <li>Positive vibes only</li>
        <li>Above all, respect the game</li>
      </ul>
      <h2 class="threes-heading gameplay">Gameplay</h2>
      <ul>
        <li>Players take turns drawing cards from a deck and showing them face up</li>
        <li>If you pull a three, you are safe</li>
        <li>Once all the threes are drawn, anyone without a three chugs a serving of beer</li>
        <li>Before drinking, players <strong>must</strong> say &quot;いただきます&quot;, &quot;行きます&quot;, &quot;cheers&quot; or something similar</li>
        <li>If the chug is interrupted in some way (lips coming off the cup, stopping to laugh), the cup is immediately topped up and the chug restarted
          <ul>
            <li>Interruptions on the second chug are irrelevant</li>
          </ul>
        </li>
        <li>Any foul results in an immediate batsu game. The main game is resumed once the batsu is over</li>
        <li>If a round ends with everyone safe (everyone pulled a three), everyone instead loses and drinks a double serving</li>
      </ul>
      <h2 class="threes-heading batsu-game-rules">Batsu game rules</h2>
      <ul>
        <li>Batsu game is played 2v1, where the one is the offender and the two are any two other players</li>
        <li>Get creative and come up with a fun, quick game. Cannot repeat games
          <ul>
            <li>The offender cannot choose their own batsu game. Decision/approval must come from the others in the group</li>
          </ul>
        </li>
        <li>If the offender wins, all others chug half a serving</li>
        <li>If the offender loses, they drink double a serving</li>
        <li>No further fouls or chugging interruption penalties can occur during a batsu game</li>
      </ul>
      <h2 class="threes-heading example-batsu-games">Example batsu games</h2>
      <ul>
        <li>Handstand competition</li>
        <li>Furthest throw of a card</li>
        <li>Bouncing a coin into a cup</li>
        <li>Hit a target with a frisbee</li>
        <li>Tug of war (with a towel)</li>
        <li>Fastest to take all their clothes off and put them back on</li>
      </ul>
      <h2 class="threes-heading example-fouls">Example fouls</h2>
      <ul>
          <li>Drawing out of order</li>
          <li>Spilling beer</li>
          <li>Laughing or stopping during beer chug</li>
      </ul>
    </section>
  </DefaultLayout>
)

export default SecondPage