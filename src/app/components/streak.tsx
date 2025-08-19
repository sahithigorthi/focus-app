import { useContext, useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { UsernameContext, MoneyContext } from './context';

export default function Streak() {
  const [streak, setStreak] = useState(0);
  const { username } = useContext(UsernameContext);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  useEffect(() => {
    if (!username) {
      console.log('[Streak] Username not available.');
      return;
    }

    console.log('[Streak] Username changed, running updateStreak.');

    const updateStreak = async () => {
      try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);

        const todayStr = formatDate(today);
        const yesterdayStr = formatDate(yesterday);
        const twoDaysAgoStr = formatDate(twoDaysAgo);

        const { data: userRow, error } = await supabase
          .from('userdata')
          .select('streak, last_study')
          .eq('email', username)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('[Streak] Fetch error:', error);
          return;
        }

        if (!userRow) {
          console.log('[Streak] No user record → creating streak=1');
          const { error: insertError } = await supabase
            .from('userdata')
            .insert({
              email: username,
              streak: 1,
              last_study: today.toISOString(),
            });

          setStreak(insertError ? 0 : 1);
          return;
        }

        const lastStudyDateStr = userRow.last_study
          ? formatDate(new Date(userRow.last_study))
          : null;
        const currentStreak = userRow.streak ?? 0;

        if (lastStudyDateStr === todayStr) {
          setStreak(currentStreak);
        } else if (lastStudyDateStr === yesterdayStr) {
          const newStreak = currentStreak + 1;
          const { error: updateError } = await supabase
            .from('userdata')
            .update({
              streak: newStreak,
              last_study: today.toISOString(),
            })
            .eq('email', username);

          setStreak(updateError ? currentStreak : newStreak);
        } else if (lastStudyDateStr && lastStudyDateStr <= twoDaysAgoStr) {
          const { error: resetError } = await supabase
            .from('userdata')
            .update({
              streak: 0,
              last_study: today.toISOString(),
            })
            .eq('email', username);

          setStreak(resetError ? currentStreak : 0);
        } else {
          const { error: resetError } = await supabase
            .from('userdata')
            .update({
              streak: 1,
              last_study: today.toISOString(),
            })
            .eq('email', username);

          setStreak(resetError ? 0 : 1);
        }
      } catch (err) {
        console.error('[Streak] Unexpected error:', err);
      }
    };

    updateStreak();
  }, [username]); // ✅ no updateStreak or setStreak deps needed

  return (
    <div className="absolute top-0 left-0 m-4 flex font-semibold text-blue-300 bg-blue-100 rounded-4xl py-2 px-4 size-fit flex-row">
      <div className="whitespace-nowrap">{streak} days</div>
    </div>
  );
}

export function Money() {
  const { username } = useContext(UsernameContext);
  const { money, setMoney } = useContext(MoneyContext);

  useEffect(() => {
    if (!username || !username.includes('@')) return;

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
        setMoney(0);
      } else {
        setMoney(data.money);
      }
    };

    fetchMoney();
  }, [username, setMoney]);

  return (
    <div className="bg-blue-100 text-blue-300 font-semibold px-4 py-2 rounded-3xl absolute top-0 left-12 whitespace-nowrap -z-10">
      {money} c
    </div>
  );
}
