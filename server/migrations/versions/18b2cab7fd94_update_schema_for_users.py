"""update schema for users

Revision ID: 18b2cab7fd94
Revises: bcdef46986a7
Create Date: 2023-06-26 13:17:18.123481

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18b2cab7fd94'
down_revision = 'bcdef46986a7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('email', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_concerts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('concert_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['concert_id'], ['concerts.id'], name=op.f('fk_user_concerts_concert_id_concerts')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_concerts_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_concerts')
    op.drop_table('users')
    # ### end Alembic commands ###
