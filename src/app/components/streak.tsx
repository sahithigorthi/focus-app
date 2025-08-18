import {useContext, useState, useEffect} from 'react';
import { supabase } from '../../../lib/supabaseClient'
import { UsernameContext, MoneyContext } from './context';


export default function Streak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const { username } = useContext(UsernameContext);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  const updateStreak = async () => {
    console.log('[Streak] Starting updateStreak...');
    if (!username) {
      console.log('[Streak] No username, skipping update.');
      setLoading(false);
      return;
    }
    console.log(`[Streak] Username: ${username}`);

    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const todayStr = formatDate(today);
      const yesterdayStr = formatDate(yesterday);
      const twoDaysAgoStr = formatDate(twoDaysAgo);

      console.log(`[Streak] Today: ${todayStr}, Yesterday: ${yesterdayStr}, Two Days Ago: ${twoDaysAgoStr}`);

      const { data: userRow, error } = await supabase
        .from('userdata')
        .select('streak, last_study')
        .eq('email', username)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('[Streak] Fetch error:', error);
        setLoading(false);
        return;
      }

      console.log('[Streak] User data fetched:', userRow);

      if (!userRow) {
        console.log('[Streak] No user record found. Creating new record with streak=1.');
        const { error: insertError } = await supabase
          .from('userdata')
          .insert({
            email: username,
            streak: 1,
            last_study: today.toISOString(),
          });

        if (insertError) {
          console.error('[Streak] Insert error:', insertError);
          setStreak(0);
        } else {
          setStreak(1);
          console.log('[Streak] New streak set to 1.');
        }
        setLoading(false);
        return;
      }

      const lastStudyDateStr = userRow.last_study ? formatDate(new Date(userRow.last_study)) : null;
      const currentStreak = userRow.streak ?? 0;

      console.log(`[Streak] Last study date: ${lastStudyDateStr}, Current streak: ${currentStreak}`);

      if (lastStudyDateStr === todayStr) {
        console.log('[Streak] Already studied today. Streak unchanged.');
        setStreak(currentStreak);
        setLoading(false);
        return;
      }

      if (lastStudyDateStr === yesterdayStr) {
        const newStreak = currentStreak + 1;
        console.log('[Streak] Last study was yesterday. Incrementing streak to:', newStreak);
        const { error: updateError } = await supabase
          .from('userdata')
          .update({
            streak: newStreak,
            last_study: today.toISOString(),
          })
          .eq('email', username);

        if (updateError) {
          console.error('[Streak] Update streak error:', updateError);
          setStreak(currentStreak);
        } else {
          setStreak(newStreak);
          console.log('[Streak] Streak updated successfully.');
        }
        setLoading(false);
        return;
      }

      if (lastStudyDateStr && lastStudyDateStr <= twoDaysAgoStr) {
        console.log('[Streak] Last study was 2 or more days ago. Resetting streak to 0.');
        const { error: resetError } = await supabase
          .from('userdata')
          .update({
            streak: 0,
            last_study: today.toISOString(),
          })
          .eq('email', username);

        if (resetError) {
          console.error('[Streak] Reset streak error:', resetError);
          setStreak(currentStreak);
        } else {
          setStreak(0);
          console.log('[Streak] Streak reset to 0.');
        }
        setLoading(false);
        return;
      }

      // Unexpected case or no last_study date
      console.log('[Streak] No valid last_study date found or edge case. Setting streak to 1.');
      const { error: resetError } = await supabase
        .from('userdata')
        .update({
          streak: 1,
          last_study: today.toISOString(),
        })
        .eq('email', username);

      if (resetError) {
        console.error('[Streak] Reset streak error:', resetError);
        setStreak(0);
      } else {
        setStreak(1);
        console.log('[Streak] Streak set to 1.');
      }
      setLoading(false);
    } catch (err) {
      console.error('[Streak] Unexpected error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      console.log('[Streak] Username changed, running updateStreak.');
      updateStreak();
    } else {
      console.log('[Streak] Username not available.');
    }
  }, [username]);
  
    



    return(
        <div className="absolute top-0 left-0 m-4 flex font-semibold text-blue-300 bg-blue-100 rounded-4xl py-2 px-4 size-fit flex-row">
            <div className="whitespace-nowrap"> {streak} days </div>      
        </div>
    );


}

interface Props{
    money: number;
    setMoney: React.Dispatch<React.SetStateAction<number>>;
}

export function Money(){
    const { username } = useContext(UsernameContext);
    const {money, setMoney} = useContext(MoneyContext);


    useEffect(() => {
        if (!username || !username.includes('@')) return; // simple validation

        const fetchMoney = async () => {
        const { data, error } = await supabase
            .from('userdata')
            .select('money')
            .eq('email', username)
            .maybeSingle();

        if (error) {
            console.error('Error fetching money:', error.message);
            setMoney(0);
        } else if (!data) {
            console.log('No user data found for this email.');
            setMoney(0);
        } else {
            setMoney(data.money);
        }
        };

        fetchMoney();
    }, [username]);

    return (
        <div className="bg-blue-100 text-blue-300 font-semibold px-4 py-2 rounded-3xl absolute top-0 left-12 whitespace-nowrap -z-10">
        {money} c
        </div>
    );
}